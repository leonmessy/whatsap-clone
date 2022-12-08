import React, {useState, useEffect} from 'react'
import { Avatar,IconButton } from '@mui/material';
import "./Chat.css"
import {useStateValue} from "./Stateprovider";
import InsertEmoticonIcon  from '@mui/icons-material/InsertEmoticon'
import {SearchOutlined, MoreVert, AttachFile} from '@mui/icons-material'
import {Mic}  from '@mui/icons-material'
import {useParams} from "react-router-dom";
import firebase from 'firebase/compat/app';

import db from './Firebase';
import userEvent from '@testing-library/user-event';
function Chat() {
    const [seed, setSeed]= useState("");
    const [input,setInput]=useState("");
    const {roomId}= useParams();
    const [roomName, setRoomName]= useState("");
    const [messages, setMessages]=useState([]);
    const [{user}, dispatch]=useStateValue();
    useEffect(()=>{
if(roomId){
    db.collection('rooms').doc(roomId).
    onSnapshot(snapshot=>(setRoomName(snapshot.data().name)))
    db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp',
    'asc').onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>
        doc.data()))))}
        console.log(messages)
    }, [roomId])
    useEffect(() => {
      setSeed(Math.floor(Math.random()*5000))

    }, [roomId
    ])
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
setInput("");
    }
    
  return (
    <div className ='chat'>
        <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen{""}
                {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="chat_headerRight">
<IconButton>
    <SearchOutlined/>
</IconButton>
<IconButton>
    <AttachFile/>
</IconButton>
<IconButton>
    <MoreVert/>
</IconButton>
            </div>
        </div>
        <div className="chat_body">
            {messages.map((message)=>(<p className={`chat_message ${message.name===user.displayName && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span> {message.message}
            <span className="chat_timeStamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
                </span></p>))}
            
            
        </div>
        <div className="chat_footer">
            <InsertEmoticonIcon/>
<form>
    <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message" type="text"/>
    <button onClick={sendMessage} type ="submit">Send a message</button>
</form>
            <Mic/>
        </div>
    </div>
  )
}

export default Chat