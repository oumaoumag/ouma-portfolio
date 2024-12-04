import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

const Events = () => {
  const events = [
    {
      title: "Gophercon-Africa 2024",
      role: "Participant",
      topic: "Annual conference uniting Go enthusiasts for innovation, collaboration, and ecosystem progress across Africa.",
      date: "October 2024",
      location: "Ihub, Nairobi",
      image: "/images/events/inhouse-hackathon.jpeg",
    },
    {
      title: "Google Developer Groups(GDG) 2024",
      role: "Participant",
      topic: "Build with AI",
      date: "June 2023",
      location: "UON, Kisumu",
      image: "/images/events/gdg-kisumu.jpeg"
    },
    {
      title: "Kisumu Gophers 2024",
      role: "Contributor",
      topic: "API's",
      date: "November 2024",
      location: "Lakehub, Kisumu",
      image: "/images/events/gophers-meetup.jpeg"
    },
    {
      title: "Pint of Science 2023",
      role: "Panelist",
      topic: "AI in Modern Applications",
      date: "May 2024",
      location: "Lakehub, Kisumu",
      image: "/images/events/hackathone.jpeg"
    }
  ];

  return (
    <section className="py-20 px-4" id="events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Speaking & Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-md
              border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-blue-400 mb-4">{event.role} - {event.topic}</p>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;