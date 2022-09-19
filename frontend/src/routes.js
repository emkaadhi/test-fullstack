/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";
import Book from 'views/book'


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-calendar-60",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/book",
    name: "Master Buku",
    icon: "nc-icon nc-book-bookmark",
    component: Book,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Master User",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Data Peminjaman",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
];
export default routes;
