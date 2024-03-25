import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselItem({ itemImages }) {
  return (
    <div className="w-full  mx-auto sm:w-full sm:mx-6">
      <Carousel className=" h-full " autoPlay infiniteLoop showArrows={true}>
        {itemImages.map((item, index) => (
          <div key={index} className="h-full">
            <img src={item} className="min-h-full " />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
