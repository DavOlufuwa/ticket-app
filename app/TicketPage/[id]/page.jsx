import TicketForm from "@/app/(components)/TicketForm"

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/alltickets/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get ticket", error);
  }
} 

const TicketPage = async ({params}) => {

  const EDITMODE = params.id === "new" ? false : true

  let updateTicketData = {}
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id)
    updateTicketData = updateTicketData.ticket
  }
  else {
    updateTicketData = {
      _id : "new",
    }
  }
  return (
    <TicketForm ticket={updateTicketData} />
  )
}

export default TicketPage