import webapp2
import os
import jinja2

#get current directory
template_dir = os.path.join(os.getcwd(),'templates')
#initialize template engine
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)

#handle template processing using jinja2 templates
class Handler(webapp2.RequestHandler):

    def write(self,*a,**kw):
        self.response.out.write(*a,**kw)
        
    def render_str(self,template,**params):
        t=jinja_env.get_template(template)
        return t.render(params)
    
    def render(self,template,**kw):
        self.write(self.render_str(template,**kw))

class GamePage(Handler):

	#render html page
    def render_page(self):
        self.render("index.html")

    def get(self):
        self.render_page()

app = webapp2.WSGIApplication([
    ('/', GamePage)
], debug=True)
