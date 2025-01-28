import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import personDetailsAsync from "../store/actions/personDetailsAsync";
import HeaderBrowse from "./HeaderBrowse";
import Loading from "./Loading";
import { removePersonDetailsData } from "../store/personDetailsSlice";
import VerticalCards from "./VerticalCards";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const data = useSelector((store) => store.personDetails.info);

  console.log(data);

  useEffect(() => {
    dispatch(removePersonDetailsData());
    dispatch(personDetailsAsync(id));
  }, []);

  if (data == null) return <Loading />;

  return (
    <div className="bg-black  text-white ">
      <HeaderBrowse />
      <div className=" w-full  text-white px-52">
        <div className="grid grid-cols-12 gap-x-8">
          <div className=" col-span-3 flex justify-start pt-6 flex-col gap-y-4">
            <div>
              <img
                className="size-96 h-[520px]   rounded-lg"
                src={`https://image.tmdb.org/t/p/original/${data.details.profile_path}`}
              />
            </div>

            <div>
              <div className="social-handles flex gap-x-3 items-center">
                {data?.externalId?.imdb_id && (
                  <div>
                    <a
                      target="_blank"
                      href={`https://www.imdb.com/name/${data?.externalId?.imdb_id}`}
                    >
                      <img
                        className="size-10"
                        src={
                          "https://img.icons8.com/?size=100&id=5301&format=png&color=FFFFFF"
                        }
                      />
                    </a>
                  </div>
                )}
                {data?.externalId?.twitter_id && (
                  <div>
                    <a
                      target="_blank"
                      href={`https://x.com/${data?.externalId?.twitter_id}`}
                    >
                      <i className="ri-twitter-x-fill text-2xl"></i>
                    </a>
                  </div>
                )}
                {data?.externalId?.instagram_id && (
                  <div>
                    <a
                      target="_blank"
                      href={`https://www.instagram.com/${data?.externalId?.instagram_id}`}
                    >
                      <i className="ri-instagram-line text-2xl"></i>
                    </a>
                  </div>
                )}
                {data?.externalId?.tiktok_id && (
                  <div>
                    <a
                      target="_blank"
                      href={`https://tiktok.com/${data?.externalId?.tiktok_id}`}
                    >
                      <i className="ri-tiktok-line text-2xl"></i>
                    </a>
                  </div>
                )}
                {data?.externalId?.facebook_id && (
                  <div>
                    <a
                      target="_blank"
                      href={`https://www.facebook.com/${data?.externalId?.facebook_id}`}
                    >
                      <i className="ri-facebook-fill text-2xl"></i>
                    </a>
                  </div>
                )}
              </div>
              <div className="personal_info flex flex-col gap-y-3 ">
                <h3  className="text-lg font-bold">Personal Info</h3>

                <div>
                  {" "}
                  <h3 className="font-bold">Known For</h3>
                  <p>{data.details.known_for_department}</p>
                </div>
                <div>
                  {" "}
                  <h3 className="font-bold">Gender</h3>
                  <p>{data.details.gender == 1 ? "Female" : "Male"}</p>
                </div>
                <div>
                  {" "}
                  <h3 className="font-bold">Birthday</h3>
                  <p>
                    {(() => {
                      const birthday = new Date(data.details.birthday);
                      const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      };
                      const formattedDate = birthday.toLocaleDateString(
                        undefined,
                        options
                      );

                      const ageDiff = new Date() - birthday;
                      const ageDate = new Date(ageDiff);
                      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

                      return `${formattedDate} (${age} years old)`;
                    })()}
                  </p>
                </div>
                <div>
                  {" "}
                  <h3 className="font-bold">Place of Birth</h3>
                  <p>{data.details.place_of_birth}</p>
                </div>
                <div>
                  {" "}
                  <h3 className="font-bold" >Also Known as</h3>
                  <div className="mt-2">
                    {data.details.also_known_as.map((data , index) => (
                      <p  key={index} className="mb-2">{data}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="  p-6 col-span-9 flex flex-col gap-y-6">
            <h2 className="text-2xl font-bold"> {data.details.name}</h2>
           { data.details.biography !== "" || null ?  <div className="w-[90%] flex gap-2 flex-col">
              <h4 className="text-xl font-bold">Biography</h4>
              <p className="text-sm">
                {data.details.biography}
                
              </p>
            </div> : <div>  {`We don't have a biography for ${data.details.name}`}</div>  }
        
           
            <div className="flex flex-col gap-2 h-[]">
              <h4 className="font-bold text-xl ">Movie Credits</h4>
              <VerticalCards data={data.movieCredits.cast} />
            </div>

         

            <div className="flex flex-col gap-2 h-[]">
              <h4 className="font-bold text-xl ">TV Credits</h4>
              <VerticalCards data={data.tvCredits.cast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
