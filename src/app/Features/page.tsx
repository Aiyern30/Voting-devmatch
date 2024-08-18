import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import React from "react";
import Footer from "@/components/ui/Components/Footer";

const page = () => {
  return (
    <div>
      <Header />
      <div className="text-3xl font-bold text-center my-5">
        Bling bling features
      </div>
      <div className="flex justify-center space-x-2 ">
        <Card className="max-w-96 ">
          <CardHeader className="space-y-5">
            <div className="bg-black h-32 w-32"></div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti
              amet, mollitia neque aliquam dicta accusamus eligendi nihil
              ducimus aut recusandae cumque, modi voluptate molestiae suscipit
              labore ipsum ipsam minima consequatur!
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-96">
          <CardHeader className="space-y-5">
            <div className="bg-black h-32 w-32"></div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              nulla commodi esse accusantium ullam, ut vel laudantium placeat
              blanditiis laboriosam nihil, pariatur eaque, obcaecati doloribus
              modi quae at eligendi reiciendis.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="max-w-96">
          <CardHeader className="space-y-5">
            <div className="bg-black h-32 w-32"></div>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              maxime vel optio maiores perspiciatis id quae ullam quibusdam,
              saepe voluptates earum doloremque nisi delectus ipsa a
              repellendus, modi culpa nobis?
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
