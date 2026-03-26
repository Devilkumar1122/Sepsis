

export default function ProfileCard(){
    return(
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center relative">

            {/* PROFILE IMAGE */}
            <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-16 bg-gray-200">
                <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-full h-full object-cover"
                />
            </div>
            </div>

            {/* NAME */}
            <h2 className="text-xl font-bold text-gray-900 mt-4">
            John Doe
            </h2>

            {/* ROLE / TAG */}
            <p className="text-sm text-gray-500 mb-4">
            Patient Profile
            </p>

            {/* DETAILS */}
            <div className="space-y-3 text-sm text-gray-600">

            <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="font-medium">Email</span>
                <span className="text-gray-800">john@example.com</span>
            </div>

            <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="font-medium">User ID</span>
                <span className="text-gray-800">#UI-84729</span>
            </div>

            <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="font-medium">Age</span>
                <span className="text-gray-800">45</span>
            </div>

            <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="font-medium">Gender</span>
                <span className="text-gray-800">Male</span>
            </div>

            </div>
        </div>
    )
}