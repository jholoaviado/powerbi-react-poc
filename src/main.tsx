import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'jotai';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</Provider>,
)
