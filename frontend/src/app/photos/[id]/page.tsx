"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IPhoto } from "../../types/types";

export default function Page() {
  const pathname = usePathname();
  const [data, setdata] = useState<IPhoto>();

  useEffect(() => {
    fetch(`http://localhost:4000/externalapi${pathname}`).then((data) => {
      data.json().then((photos) => {
        setdata(photos);
      });
    });
  }, [pathname]);

  if (!data) {
    return (
      <div className="flex justify-center flex flex-col items-center">
        <span className="loading loading-infinity loading-lg"></span>
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Link
          href="/"
          className="m-7 btn btn-active btn-neutral w-1/6 flex justify-center"
        >
          Take me back
        </Link>
      </div>
      <div className="flex  pb-8 justify-center">
        <div className="m-6 w-4/6 ">
          <div className="card card-side bg-base-100 shadow-xl">
            <figure>
              <img src={data.thumbnailUrl} alt={data.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{data.title} </h2>
              <p>{data.album.title}</p>
              <p> {data.album.user.name}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="border border-sky-100 artboard artboard-horizontal phone-1 m-5"></div>
      </div>
    </div>
  );
}
