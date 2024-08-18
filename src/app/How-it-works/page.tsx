import { Card, CardContent } from "@/components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/Carousel";
import Header from "@/components/ui/Components/Header";
import React from "react";
import Footer from "@/components/ui/Components/Footer";

const page = () => {
  // Define an array of card data with titles and descriptions
  const cardData = [
    { title: "Card 1", description: "Description for Card 1" },
    { title: "Card 2", description: "Description for Card 2" },
    { title: "Card 3", description: "Description for Card 3" },
    { title: "Card 4", description: "Description for Card 4" },
    { title: "Card 5", description: "Description for Card 5" },
  ];

  return (
    <div>
      <Header />
      <div className="text-3xl font-bold text-center my-5">
        How Does it Work?
      </div>
      <Carousel className="w-full max-w-7xl mx-auto">
        <CarouselContent className="-ml-1">
          {cardData.map((card, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="min-w-[270px] min-h-[430px] bg-[#987070]">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{card.title}</span>
                    <p className="mt-2 text-center">{card.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
