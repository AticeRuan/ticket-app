import TicketCard from "./(components)/TicketCard"

const getTickets = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/Tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};


const Dashboard = async () => {
  const data = await getTickets()

  const tickets = data.tickets

  
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];


  return (
    <div className="p-5">
      <div>
        {tickets&& uniqueCategories.map((uniqueCategory,categoryIndex) => (
          <div key={categoryIndex} className="mb-4">
            <h2>{uniqueCategory}</h2>
            
      
      <div className=" xl:grid-cols-4 md: grid grid-cols-2">
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
    </div> ))} 
      </div>        
      </div>
  )
}

export default Dashboard
