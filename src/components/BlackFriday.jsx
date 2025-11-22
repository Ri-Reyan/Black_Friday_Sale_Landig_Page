import React, { useEffect, useRef, useState } from "react";

const BlackFriday = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const endTimeRef = useRef(null); // Initialize empty

  useEffect(() => {
    // Set the end time after the component mounts
    endTimeRef.current = Date.now() + 432000000; // 5 days in ms

    const calculateTime = () => {
      const now = Date.now();
      const diff = endTimeRef.current - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      } else {
        return {
          days: Math.floor(diff / (24 * 60 * 60 * 1000)),
          hours: Math.floor((diff / (60 * 60 * 1000)) % 24),
          minutes: Math.floor((diff / (60 * 1000)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        };
      }
    };

    setTimeLeft(calculateTime()); // initialize state

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-zinc-900 to-zinc-800 flex-grow h-screen w-full text-white md:h-screen lg:h-full ">
      <div className="font-normal tracking-widest flex justify-center relative top-4 text-3xl">
        <h1>
          SOMETHING BIG IS <br />
          <span className="mx-16">COMING</span>
        </h1>
      </div>

      <div className="flex flex-col space-y-10 items-center mt-10 overflow-auto">
        <div className="flex gap-32">
          <div>
            <span className="font-bold text-7xl transition-all duration-300 hover:scale-110">
              {timeLeft.days}
            </span>
            <h3 className="text-center">days</h3>
          </div>

          <div>
            <span className="font-bold text-7xl transition-all duration-300 hover:scale-110">
              {timeLeft.hours}
            </span>
            <h3 className="text-center text-lg">hours</h3>
          </div>
        </div>

        <div className="flex gap-32">
          <div>
            <span className="font-bold text-7xl transition-all duration-300 hover:scale-110">
              {timeLeft.minutes}
            </span>
            <h3 className="text-center text-lg">minutes</h3>
          </div>

          <div>
            <span className="font-bold text-7xl transition-all duration-300 hover:scale-110">
              {timeLeft.seconds}
            </span>
            <h3 className="text-center text-lg">seconds</h3>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-10 text-center text-xl font-normal">
          <h1>Our biggest sale ever will</h1>
          <h1>change the way you live.</h1>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEmail("");
            setSuccess(true);
          }}
          className="flex flex-col space-y-4 place-items-center mt-10"
        >
          <input
            className="h-[60px] w-[60%] rounded-md px-4 text-lg text-gray-700 bg-white focus:ring-4 focus:ring-yellow-300 outline-none"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          {success === false ? (
            <></>
          ) : (
            <h4 className="text-green-500 text-lg font-medium">Successfull</h4>
          )}

          <button className="h-[60px] w-[60%] rounded-md px-4 text-xl font-semibold text-black bg-yellow-400 focus:outline-none hover:scale-110">
            NOTIFY ME
          </button>
        </form>

        <div className="mt-10 text-center text-lg font-normal">
          <h1 className="whitespace-nowrap tracking-tighter">
            Provide your email address to get notified when
          </h1>
          <h1> the sale starts.</h1>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default BlackFriday;
