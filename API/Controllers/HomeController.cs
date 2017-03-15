using DAL.Entities;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace API.Controllers
{
    public class HomeController : Controller
    {
        UnitOfWork uow = new UnitOfWork();
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            uow.Users.Create(new User {Id=1,Name="Favor"});
            return View();
        }
    }
}
