namespace :build do
  
  desc "Build project."
  task :build => :clean do
    sh "mkdir build" 
    sh "cp -r css build"
    sh "cp -r images build"
    sh "cp -r js build"
    sh "ruby scripts/build.rb > build/index.html"
  end

  desc "Remove build directory."
  task :clean do
    sh "rm -rf build"
  end

end
