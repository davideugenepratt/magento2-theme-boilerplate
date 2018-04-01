# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'json'
composer = JSON.parse(File.read(File.join(File.dirname(__FILE__), 'composer.json')))
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  ip = composer["server-ip"] ? composer["server-ip"] : "192.168.70.12"
  config.vm.network "private_network", ip: composer[ 'server-ip' ]
  config.berkshelf.enabled = true
  config.vm.provision "chef_solo" do |chef|
    chef.add_recipe "php-box-core"
    chef.add_recipe "php-box-core::dev"
  end
  config.vm.provision "shell", path: "vagrant/provision/nginx.sh"
  config.vm.provision "shell", path: "vagrant/provision/mysql.sh"
end
