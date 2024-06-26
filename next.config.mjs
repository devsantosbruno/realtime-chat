/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	images: {
		domains: [
			"res.cloundinary.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
			"res.cloudinary.com",
		],
	},
};

export default nextConfig;
