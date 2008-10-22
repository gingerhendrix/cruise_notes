
require 'yaml'

klass = YAML.load_file("classes/projects.yml")[0]

puts "<html><head><link rel='stylesheet' href='css/class_diagram.css'></head><body>"

puts "<div class='class_diagram'>"
puts "<div class='class_name'>#{klass['name']}</div>"
methods = klass['methods']
methods.each do |m|
  puts "<span class='method #{m['tags'].join(' ')}'>#{m['name']}</span>\n"
end


puts "</div>"
puts "</body></html>"
