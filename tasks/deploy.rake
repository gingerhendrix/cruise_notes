


namespace :deploy do
  
  desc "Deploy."
  remote_task :deploy => 'build:build'  do
      run "sudo mkdir -p -v #{DEPLOY_ROOT}/rels"

      date_stamp = Time.now.strftime("%Y%m%d")
      last_release = run("ls #{DEPLOY_ROOT}/rels | sort -r | head -n 1").chomp

      if last_release =~ /#{date_stamp}\-(\d+)/
        serial = $1.to_i + 1
      else
        serial = 0 
      end

      rel = ("%d-%02d" % [date_stamp, serial])
      rel_dir = "#{DEPLOY_ROOT}/rels/#{rel}"

      rsync 'build', "/tmp/build-#{rel}"
      run "sudo mv /tmp/build-#{rel}/build #{rel_dir}"
      run "sudo rm -f #{DEPLOY_ROOT}/current"
      run "sudo ln -s -f #{rel_dir} #{DEPLOY_ROOT}/current"
  end
end
  
