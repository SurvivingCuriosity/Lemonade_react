import React from "react";
import lemon from "../../../assets/images/lemon.svg";
import { HeaderBottomNav } from "../../molecules/navs/HeaderBottomNav";

import { useTranslation } from "react-i18next";
import { SongKeyFinder } from "../../organisms/tools/SongKeyFinder";

export function LandingPage() {
  const [t] = useTranslation("global");

  return (
    <div className="relative z-50 w-full bg-neutral-800">
      <div
        style={{ minHeight: "100dvh" }}
        className="mx-auto flex w-11/12 flex-col items-center justify-between border px-8 py-12 pb-20 md:w-8/12 lg:w-7/12 xl:w-6/12 xl:pt-12 2xl:w-4/12"
      >
        <div>
          <div className="mb-8 flex justify-center">
            <img src={lemon} alt="icono limon" className="logo-limon-header" />
            <h1 className="mt-3 text-6xl font-bold 2xl:text-7xl">Lemonade</h1>
          </div>
          <p className="mb-8">{t("header.welcome-message")}</p>
        </div>

        <SongKeyFinder />

        <div className="flex w-full flex-col items-center">
          <a
            className={
              "text-2xl bg-[#FFCC4D] py-2 px-4 rounded-lg text-neutral-900 font-bold"
            }
            href="#tutorial"
          >
            {t("header.tools-btn")}
          </a>
          <HeaderBottomNav />
        </div>
      </div>
    </div>
  );
}
