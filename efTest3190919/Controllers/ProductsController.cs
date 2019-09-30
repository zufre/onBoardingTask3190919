using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using efTest3190919.Models;

namespace efTest3190919.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private OnboardingProjectEntities db = new OnboardingProjectEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetProducts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Products.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult Create(Product product)
        {
            Product prod = new Product();
            prod.Name = product.Name;
            prod.Price = product.Price;

            db.Products.Add(prod);
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Edit([Bind(Include = "Id,Name,Price")] Product product)
        {
            var prod = db.Products.Find(product.Id);
            prod.Name = product.Name;
            prod.Price = product.Price;
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);
        }
        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Product prod = db.Products.Find(id);
            db.Products.Remove(prod);
            db.SaveChanges();
            return Json(prod, JsonRequestBehavior.AllowGet);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
