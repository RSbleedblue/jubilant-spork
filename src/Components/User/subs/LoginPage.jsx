import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import codeFlow from '../../../assets/Codeflow.png';
import { auth } from "../../utils/Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Redux/Slices/LoginSlice";
import { changeEmail, changeOption } from "../../Redux/Slices/UserSlice";

const LoginPage = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [openReset, setOpenReset] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    const handleResetPassword = async () => {
        if (!resetEmail) {
            setShowWarning(true);
            return;
        }
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset email sent!", {
                icon: <img src={codeFlow} alt="Success" className="w-6 h-6" />,
                theme: 'dark',
            });
            setOpenReset(false); 
            setShowWarning(false);
        } catch (error) {
            toast.error(`Error: ${error.message}`, { theme: 'dark' });
        }
    }

    const handleOpen = () => {
        setOpenReset(!openReset);
        setShowWarning(false);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!userPassword || !userName) {
            toast.dark("Please fill all the fields", { icon: <img src={codeFlow} alt="icon" /> });
            return;
        }

        toast.promise(
            signInWithEmailAndPassword(auth, userName, userPassword)
                .then((res) => {
                    console.log(res.user.email);
                    toast.success("Successfully logged in!", {
                        icon: <img src={codeFlow} alt="Success" className="w-6 h-6" />,
                        theme: 'dark',
                    });
                    dispatch(loginSuccess(true));
                    dispatch(changeOption("home"));
                    dispatch(changeEmail(res.user.email));
                    navigate("/user");
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`, { theme: 'dark' });
                }),
            {
                pending: {
                    render() {
                        return "Logging in...";
                    },
                    icon: true,
                    theme: 'dark'
                },
                error: {
                    render({ data }) {
                        return `Error: ${data.message}`;
                    }
                }
            }
        );
    };

    return (
        <>
            <div className="text-white mt-[20%] flex flex-col gap-10 w-[40%]">
                <form onSubmit={handleLogin} className="flex flex-col gap-10">
                    <Input
                        variant="standard"
                        label="Email"
                        className="text-white::placeholder opacity-50 text-3xl"
                        color="white"
                        height={"100%"}
                        width={"100%"}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <div>
                        <Input
                            variant="standard"
                            type="password"
                            label="Password"
                            className="text-white::placeholder opacity-50 text-3xl"
                            color="white"
                            size="100%"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <Typography
                            variant="small"
                            color="gray"
                            className="mt-2 flex items-center gap-1 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-px h-4 w-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Use at least 8 characters.
                        </Typography>
                    </div>
                    <Button
                        variant="text"
                        className="rounded-full text-white border border-solid"
                        color="white"
                        type="submit"
                    >
                        LogIn
                    </Button>
                </form>
                <div>
                    <p className="text-sm flex gap-2">Forgot password?<span className="text-codeFlow cursor-pointer" onClick={handleOpen}>Reset</span></p>
                </div>
            </div>
            <Dialog open={openReset} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Reset Password
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody color="black">
                    <Typography className="mb-10 -mt-7" color="gray" variant="lead">
                        Enter your email address to reset your password.
                    </Typography>
                    <div className="grid gap-6">
                        <Input
                            label="Email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />
                    </div>
                    {
                        showWarning && (
                            <Typography color="red" className="mt-4 ml-2 text-sm">
                                Email Missing!
                            </Typography>
                        )
                    }
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button variant="gradient" color="black" onClick={handleResetPassword}>
                        Reset Password
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default LoginPage;
