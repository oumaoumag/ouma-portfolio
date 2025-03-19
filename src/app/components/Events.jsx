import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';

const Events = () => {
  const events = [
    {
      title: "Google I/O Extended Hackathon 2024",
      role: "Participant",
      topic: "Annual conference uniting Go enthusiasts for innovation, collaboration, and ecosystem progress across Africa.",
      date: "October 2024",
      location: "Lakhub, Kisumu",
      image: "/images/events/hackathone.jpeg",
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
      title: "Kenya National Artificial Intelligence Strategy Townhall",
      role: "Group Session Moderator",
      topic: "A public participation event to assist in the development of Kenya's National Articial Intelligence (AI) Strategy",
      date: "May 2024",
      location: "Lakehub, Kisumu",
      image: "/images/events/ai-townhall.jpeg"
    }
  ];

  return (
    <section className="py-8 px-4" id="events">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Speaking & Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-[rgba(15,23,42,0.6)] backdrop-blur-sm border border-[rgba(120,120,180,0.2)] hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="h-40 overflow-hidden relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold mb-1 line-clamp-1">{event.title}</h3>
                <p className="text-blue-400 text-sm mb-2 line-clamp-1">{event.role} - {event.topic}</p>
                <div className="flex flex-wrap items-center gap-3 text-gray-400 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
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