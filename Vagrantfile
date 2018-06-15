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
    chef.add_recipe "lxmpbox::php"
    chef.add_recipe "lxmpbox::mysql"
    chef.add_recipe "lxmpbox::nginx"
    chef.add_recipe "meanbox::node"
  end
end
