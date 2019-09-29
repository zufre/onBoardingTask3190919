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

        // GET: Products
        public ActionResult Index()
        {
            return View(db.Products.ToList());
        }

       

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }
        // GET: Products/GetProducts
        public JsonResult GetProducts()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var data = db.Products.ToList();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
       /* [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Products.Add(product);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(product);
        }*/
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

        /*// GET: Products/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }*/

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        /*[HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Price")] Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }*/
        [HttpPost]
        
        public ActionResult Edit([Bind(Include = "Id,Name,Price")] Product product)
        {


            var prod = db.Products.Find(product.Id);

            prod.Name = product.Name;
            prod.Price = product.Price;
            db.SaveChanges();
            return Json(product, JsonRequestBehavior.AllowGet);


        }
        // GET: Products/Delete/5
        /* public ActionResult Delete(int? id)
         {
             if (id == null)
             {
                 return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
             }
             Product product = db.Products.Find(id);
             if (product == null)
             {
                 return HttpNotFound();
             }
             return View(product);
         }*/

        // POST: Products/Delete/5
        /* [HttpPost, ActionName("Delete")]
         [ValidateAntiForgeryToken]
         public ActionResult DeleteConfirmed(int id)
         {
             Product product = db.Products.Find(id);
             db.Products.Remove(product);
             db.SaveChanges();
             return RedirectToAction("Index");
         }
 */
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
