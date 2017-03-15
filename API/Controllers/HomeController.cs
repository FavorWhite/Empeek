using DAL.Entities;
using DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DAL;

namespace API.Controllers
{
    public class HomeController : Controller
    {
        private UnitOfWork uow;
        
        public ActionResult Index()
        {
            using (uow = new UnitOfWork())
            {
                ViewBag.Title = "Home Page";
                uow.Users.Create(new User { Id = 1, Name = "Favor" });
                uow.Save();

            }

            return View();
        }
    }
}
