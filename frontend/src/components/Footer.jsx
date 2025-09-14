export default function Footer() {
  return (
    <footer className="bg-green-500 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        <p>© {new Date().getFullYear()} Farm Care. All rights reserved.</p>
        <p className="text-sm mt-2">Made by Ramya Deepthi | React + Tailwind</p>
      </div>
    </footer>
  );
}
