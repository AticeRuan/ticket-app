'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ticket}) => {

  const EDITMODE=ticket._id==="new"?false:true;
  const startingTicketData = {
    title: "",
    description: "",
    priority: "1",
    progress: "0",
    status: "not started",
    category: "Hardware problem",
  };

  if(EDITMODE){
    startingTicketData["title"]=ticket.title;
    startingTicketData["description"]=ticket.description;
    startingTicketData["category"]=ticket.category;
    startingTicketData["priority"]=ticket.priority;
    startingTicketData["status"]=ticket.status;
    startingTicketData["progress"]=ticket.progress;
  }

  const [formData, setFormData] = useState(startingTicketData);

  const router = useRouter();


//update input state
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
//submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(EDITMODE){
        const res=await fetch(`/api/Tickets/${ticket._id}`,{
            method:'PUT',
            body:JSON.stringify({formData}),
            "content-type":"application/json"
        });
        if(!res.ok){
            throw new Error('Failed to update Ticket');
    }}
    else{ const res=await fetch('/api/Tickets',{
        method:'POST',
        body:JSON.stringify({formData}),
        "content-type":"application/json" });
    if(!res.ok){
        throw new Error('Failed to create Ticket');
    }}
   
    router.refresh();
    router.push('/');
    
}

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="POST" onSubmit={handleSubmit}>
        <h3>{EDITMODE?"Edit your ticket":"Create your ticket"}</h3>
        <label>Title</label>
        <input id="title" name="title" type="text" placeholder="Title" value={formData.title} onChange={handleChange} />
        <label>Description</label>
        <textarea id="Description" name="description" type="text" placeholder="Description" value={formData.description} onChange={handleChange} rows="5" />
        <label>Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="Hardware problem">Hardware problem</option>
          <option value="Software problem">Software problem</option>
          <option value="Project">Project</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input type="range" id="progress" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} />
        <label>Status</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not started</option>
          <option value="in progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <input  className="btn" type="submit" value={EDITMODE?"Update ticket":"Create ticket"}/>
      </form>
    </div>
  );
};

export default TicketForm;
