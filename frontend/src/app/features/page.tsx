import { Features } from "@/components/features";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import React from "react";

const Feature = () => {
  return (
    <div>
      <SiteHeader />
      <Features />
      <SiteFooter />
    </div>
  );
};

export default Feature;
