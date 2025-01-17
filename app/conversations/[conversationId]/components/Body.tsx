'use client';

import { useState, useRef,useEffect } from 'react';
import { FullMessageType } from "@/app/types";
import MessageBox from './MessageBox';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';

interface BodyProps {
  initialMessages: FullMessageType[]
}
const Body: React.FC<BodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx)=>(
        <MessageBox 
        isLast={idx === messages.length - 1}
        key={message.id}
        data={message}/>
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}

export default Body;
