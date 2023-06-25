const { Outlet } = require("react-router-dom")

export default function DepartmentLayout () {
    return (
        <div className="sub-layout">
            <Outlet />
        </div>
    )
}