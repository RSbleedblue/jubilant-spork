import LogoComponent from "../../Common/CommonLogo";
import PreLoader from "../../utils/PreLoader";

const NoProjects = () => {
    return (
        <>
            <div className="w-full flex justify-center flex-col items-center">
                <p className="text-gray-400 text-xl font-mono opacity-30">Search For the Projects using Keywords</p>
                {/* <LogoComponent/>*/}
                <div className="w-64 h-64 opacity-30">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'><path fill='none' stroke='#FF156D' stroke-width='15' stroke-linecap='round' stroke-dasharray='300 385' id="#custom-logo" stroke-dashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'><animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate></path></svg>
                </div>
            </div>
        </>
    )
}
export default NoProjects;