import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'jotai';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from './configs/index.ts';

const publicClientApplication = new PublicClientApplication(msalConfig);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<MsalProvider instance={publicClientApplication}>
		<Provider>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Provider>
	</MsalProvider>,
)
