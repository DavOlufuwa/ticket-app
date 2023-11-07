"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TicketForm = ({ ticket }) => {

  const EDITMODE = ticket._id === "new" ? false : true

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  if (EDITMODE) {
    startingTicketData["title"] = ticket.title
    startingTicketData["description"] = ticket.description
    startingTicketData["priority"] = ticket.priority
    startingTicketData["progress"] = ticket.progress
    startingTicketData["status"] = ticket.status
    startingTicketData["category"] = ticket.category
  }
  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const { title, description, priority, progress, status, category } = formData;

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/alltickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({formData}),
        "content-type": "application/json",
      })
      if (!res.ok) {
        throw new Error("Failed to update ticket")
      }
    }
    else{
      const res = await fetch("/api/alltickets", {
        method: "POST",
        body: JSON.stringify({formData}),
        "content-type": "application/json",
      })

      if (!res.ok) {
        throw new Error("Failed to create ticket")
      }
    }

    
    router.refresh()
    router.push("/")
  };
  // destructuring

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create Your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          onChange={handleChange}
          required={true}
          value={category}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
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
            checked={priority == 1}
          />
          <label htmlFor="priority-1">1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={priority == 2}
          />
          <label htmlFor="priority-2">2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={priority == 3}
          />
          <label htmlFor="priority-3">3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={priority == 4}
          />
          <label htmlFor="priority-4">4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={priority == 5}
          />
          <label htmlFor="priority-5">5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          onChange={handleChange}
          value={progress}
          min="0"
          max="100"
        />
        <select name="status" onChange={handleChange} value={status}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn " value={EDITMODE ? "Update Ticket" : "Create Ticket"} />
      </form>
    </div>
  );
};

export default TicketForm;
