import { useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselItem({ item, itemImages }) {
  const [seeMore, setSeeMore] = useState(false);
  const seeMoreRef = useRef(null);

  return (
    <div className="w-full flex flex-col items-center justify-center  mx-auto sm:w-full sm:mx-6 ">
      <Carousel
        className=" my-2 h-full "
        autoPlay
        infiniteLoop
        showArrows={true}
      >
        {itemImages.map((item, index) => (
          <div key={index} className="h-full">
            <img src={item} className="min-h-full " />
          </div>
        ))}
      </Carousel>
      <div className=" px-12 pb-20">
        <button ref={seeMoreRef} hidden>
          See More
        </button>
        <div>
          <button>Details</button>
        </div>
        <p
          className="cursor-pointer    text-slate-200 text-sm first-letter:text-2xl first-letter:font-bold"
          onClick={() => seeMoreRef.current.click(setSeeMore(!seeMore))}
        >
          {item.items[0].description.length > 300 && !seeMore
            ? item.items[0].description.slice(0, 300) +
              `${seeMore ? "show less" : ".....see more"}`
            : item.items[0].description}
        </p>
      </div>
      {/* related catgory */}
      <div>related</div>
    </div>
  );
}
