
import { notFound } from "next/navigation";
import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/alltickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    notFound();
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5 ">
      <div>
        {tickets ?
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{uniqueCategory}</h2>
              <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))
          : <div>No tickets Yet</div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
