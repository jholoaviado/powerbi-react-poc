import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report } from 'powerbi-client';

declare global {
	interface Window {
		report: Report
	}
}

export const PowerBIReport = () => {
	const renderPowerBIEmbeddings = () => {
		return (
			<PowerBIEmbed
				cssClassName = { "w-full h-full" }

				embedConfig = {{
					type: 'report',
					id: 'a4acd01d-6a98-4a50-8a6b-b2c010a1a74d',
					embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a4acd01d-6a98-4a50-8a6b-b2c010a1a74d&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
					accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvM2RkYmYxMTEtODk2OS00MTVjLTkzZDctZWMzMDY5OTQzOGY4LyIsImlhdCI6MTcyMTU1Njg2MCwibmJmIjoxNzIxNTU2ODYwLCJleHAiOjE3MjE1NjA5MTUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUFrczk1aU9xS2xZc3dMczVCNCtXTTBndDFSNUlLZm51ZGxtTU81c3Arai8wY3J2OEVYajMwMGJ6YXhDS1ZibXdFWlhzUE84UFVnMmN3UHhpblNVNGhtNDZjdDBmWDJZZ0NSQkZObEJKdk91dz0iLCJhbXIiOlsicHdkIiwicnNhIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZGV2aWNlaWQiOiJmNWY5YTlkNy1kOWMwLTRjYzItOTNlMy0yMmI5YWFiMGQ1MDIiLCJmYW1pbHlfbmFtZSI6IkF2aWFkbyIsImdpdmVuX25hbWUiOiJKaG9sbyIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEyMi41Mi4yMS4xNDAiLCJuYW1lIjoiSmhvbG8gQXZpYWRvIiwib2lkIjoiMjFhYmJhNWQtNWQ5Zi00ZmMzLWI2NDItMGYwMjVlZDc4NDcyIiwicHVpZCI6IjEwMDMyMDAzNTVCRjE2M0IiLCJyaCI6IjAuQVhFQUVmSGJQV21KWEVHVDEtd3dhWlE0LUFrQUFBQUFBQUFBd0FBQUFBQUFBQURBQU5vLiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIEl0ZW0uRXhlY3V0ZS5BbGwgSXRlbS5SZWFkV3JpdGUuQWxsIEl0ZW0uUmVzaGFyZS5BbGwgT25lTGFrZS5SZWFkLkFsbCBPbmVMYWtlLlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgUmVwcnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLkdpdENvbW1pdC5BbGwgV29ya3NwYWNlLkdpdFVwZGF0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiOXU4M1pWblVuUjNCSmZleFowd21LNkk4M1VQaWIxbldwMFBSUFBpeEZvRSIsInRpZCI6IjNkZGJmMTExLTg5NjktNDE1Yy05M2Q3LWVjMzA2OTk0MzhmOCIsInVuaXF1ZV9uYW1lIjoiamhvbG8uYXZpYWRvQGhvb2xpc29mdHdhcmUuY29tIiwidXBuIjoiamhvbG8uYXZpYWRvQGhvb2xpc29mdHdhcmUuY29tIiwidXRpIjoiM1g2SkkzT3diVS1wWXY1UkExTWxBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMjYifQ.Jr0nq2Fd4SnBlXVk77n1X3bERS6HhifGEcGasOhqOEkyNo760T226QQctsu2SeGan4bqzudX5RChNthlsA-rQlJ8X8k2vunzpRbXPnk-i8UZ_EfSk_k4_vJi0K8yAYf43BBd7Q3hSFlZ0rSi3trQLth78gEGB5HH7Fr7PvHFWXp2GdSGn4YeC9EgNig3tIeYhJj4bBjYyuy7BnJ7xtxBNcgE6Mz2klHCkddRK3-Qh-ouOy_pUQjx_2iIozA_yXUhO2hWGw_9uS7k2gz3m8KwJ7ZnP4ys_EGBTUhvksk3FhP2tgsTSYEzcIczDOykqwv2BprgqFYGF-SrGltlJrkEKQ',
					tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: false
							}
						},
						// background: models.BackgroundType.Transparent,
					}
				}}

				eventHandlers = {
					new Map([
						['loaded', function () {console.log('Report loaded');}],
						['rendered', function () {console.log('Report rendered');}],
						['error', function (event) {console.log(event?.detail);}],
						['visualClicked', () => console.log('visual clicked')],
						['pageChanged', (event) => console.log(event)],
					])
				}
				
				getEmbeddedComponent = { (embeddedReport) => {
					window.report = embeddedReport as Report;
				}}
			/>
		)
	} 
	
	return (
		<>
			{ renderPowerBIEmbeddings() }
		</>
	)
}