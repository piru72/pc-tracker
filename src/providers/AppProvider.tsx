import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
interface AppProviderProps {
    children: React.ReactNode;
}
export const AppProvider = (props: AppProviderProps) => {
    return (
        <ChakraProvider>
            <BrowserRouter>{props.children}</BrowserRouter>
        </ChakraProvider>


    );
}