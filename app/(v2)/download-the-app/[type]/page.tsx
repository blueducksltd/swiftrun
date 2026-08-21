import DownloadTheAppComp from "../DownloadTheAppComp";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Download App",
};
export default async function downloadTheApp() {
  return (
    <div className="py-30 px-10 md:px-40 ">
      <DownloadTheAppComp   />
    </div>
  );
}
