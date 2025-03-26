import { ClerkProvider } from "@clerk/nextjs";

interface ClientProvidersProps {
    children: React.ReactNode;
  }

export function clerkProviderComponent({ children }:ClientProvidersProps ){
    return (
        <ClerkProvider>{children}</ClerkProvider>
    )
}