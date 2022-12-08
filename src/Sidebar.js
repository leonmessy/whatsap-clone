import React, {useState, useEffect} from 'react'
import './Sidebar.css'
import {useStateValue} from "./Stateprovider"
import { Avatar,IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from "./Firebase" 
function Sidebar() {
    const[rooms, setRooms]= useState([]);
    const [{user}, dispatch]= useStateValue();
    useEffect(()=>{
const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>setRooms(snapshot.docs.map(
    (doc)=>({
        id:doc.id,
        data:doc.data(),
    })
)))
return ()=>{
    unsubscribe();
}
    },[])
    console.log(rooms)
  return (
    <div className ="sidebar">
    <div className="sidebar_header">
<Avatar src = {user?.photoURL}/>
<div className ="sidebar_headerRight">
    <IconButton>
    <DonutLargeIcon/>
    </IconButton>
    <IconButton>
    <ChatIcon/>
    </IconButton>
    <IconButton>
    <MoreVertIcon/>
    </IconButton>
    
    
</div>
    </div>
 
    <div className="sidebar_search">
    <div className ="sidebar_searchContainer">
    <SearchOutlinedIcon/>
<input placeholder="Search or start new chat" type= "text"/> 
    </div>

    </div>

    <div className ="sidebar_chats">
<SidebarChat addNewChat/>
  {rooms.map((room)=>(<SidebarChat key={room.id} id={room.id}
 name={room.data.name}/>))}   

    </div>
    </div>
  )
}

export default Sidebar