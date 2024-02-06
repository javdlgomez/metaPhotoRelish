"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { IPhoto } from "./types/types";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const title = searchParams.get("title");
  const album = searchParams.get("album");
  const email = searchParams.get("email");
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const [data, setData] = useState<IPhoto[]>([]);
  const [offsetSum, setOffset] = useState(offset ? Number(offset) : 0);
  const [limitState, setLimit] = useState(limit ? Number(limit) : 25);

  useEffect(() => {
    setOffset(0);
    const params = new URLSearchParams(searchParams);
    params.set("offset", "0");
    replace(`${pathName}?${params.toString()}`);
  }, [limitState]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (title || album || email || limit || offset) {
      if (title) {
        params.set("title", title);
      }

      if (album) {
        params.set("album.title", album);
      }

      if (email) {
        params.set("album.user.email", email);
      }
    }
    params.set("limit", limit ?? "25");

    params.set("offset", offset ?? "0");

    fetch(`/api/photos?${params.toString()}`).then(
      (data) => {
        data.json().then((photos) => {
          setData(photos);
        });
      }
    );
  }, [title, album, email, limit, offset]);

  const handleSearch = useDebouncedCallback((term: string, name: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(name, term);
    } else {
      params.delete(name);
    }

    replace(`${pathName}?${params.toString()}`);
  }, 600);

  return (
    <main>
      <div className="p-8 gap-2 flex justify-center">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            handleSearch(e.target.value, "title");
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Album"
          onChange={(e) => {
            handleSearch(e.target.value, "album");
          }}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            handleSearch(e.target.value, "email");
          }}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="flex  pb-8 justify-center">
        <div className="m-6 w-4/6 ">
          <div>
            {data.map((item, i) => {
              return (
                <div key={i}>
                  <div className="card card-side bg-base-100 shadow-xl p-5 m-1 ">
                    <figure>
                      <img src={item.thumbnailUrl} alt={item.title} />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.id} </h2>
                      <p>{item.album.title}</p>
                      <p> {item.album.user.name}</p>
                      <div className="card-actions justify-end">
                        <Link
                          href={`/photos/${item.id}`}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex justify-end">
            <input
              type="text"
              placeholder="limit"
              value={limitState}
              onChange={(e) => {
                if (!Number.isNaN(e.target.value)) {
                  setLimit(Number(e.target.value));
                  setOffset(0);
                  handleSearch(e.target.value, "limit");
                }
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <div className="join grid grid-cols-2">
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  if (offsetSum - limitState > 0) {
                    setOffset(-limitState + offsetSum);
                    handleSearch(`${offsetSum - limitState}`, "offset");
                  }
                }}
              >
                Previous page
              </button>
              <button
                className="join-item btn btn-outline"
                onClick={() => {
                  if (limitState + offsetSum < 5001) {
                    setOffset(limitState + offsetSum);
                    handleSearch(`${limitState + offsetSum}`, "offset");
                  }
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
}
