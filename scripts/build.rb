
require 'rubygems'
require 'erb'

def code_snippet(options = {})
  out = ""
  out += "<p class='caption' onclick='toggleSnippet(this)'><img class='expand_image' src='images/plus_icon.png' width='10' height='10' /><span>#{options[:caption]}</span></p>"
  out += "<div class='code_snippet'>"
  out += '<textarea name="code" class="ruby" rows="15" cols="100">'
  begin
    out += File.read("snippets/#{options[:file]}")
  rescue 
    $stderr.puts "Warning : File not found #{options[:file]} \n"
    out += "File not found #{options[:file]}"
  end
  out += '</textarea>'
  out += "</div>"
  
  out
end 

def class_diagram(options = {})
  klass = YAML.load_file("classes/#{options[:class]}.yml")
  out = ""
  
  out += "<div class='class_diagram'>"
  out += "<div class='class_name'>#{klass['name']}</div>"
  ['singleton_methods', 'instance_methods'].each do |method_type|
    methods = klass[method_type] || []
    methods.each do |m|
      if !options[:tag] || m['tags'].include?(options[:tag])
        out += "<span class='method #{method_type} #{m['tags'].join(' ')}'>#{m['name']}</span>\n"
      end
    end
  end
  out += "</div>"
  
  out
end

template = ERB.new File.read('notes.html.erb')
template.run(binding)

