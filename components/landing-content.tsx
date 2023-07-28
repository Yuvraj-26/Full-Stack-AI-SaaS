"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Emma",
    avatar: "E",
    title: "Designer",
    description: "I can confidently say it has enhanced my productivity, effortlessly handling tasks and delivering lightning-fast, precise answers to all my queries.",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Software Engineer",
    description: "As a developer, this code generating tool has become my go-to solution, saving me countless hours of manual coding by intelligently generating efficient and reliable code tailored to my specific needs.",
  },
  {
    name: "Manny",
    avatar: "M",
    title: "CEO",
    description: "AI video generating tool is a game-changer, revolutionizing content creation with its ability to effortlessly produce stunning, professional-grade videos in a matter of minutes.",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "Analyst",
    description: "The best in class, totally worth the premium subscription - it's a total game-changer, boosting productivity and making life so much easier. Love it!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}