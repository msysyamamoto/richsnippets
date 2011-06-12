# -*- coding: utf-8 -*-
require 'cgi'
require 'digest/sha1'
require 'rubygems'
require 'sinatra'
require 'slim'
require 'sass'
require 'json'

configure :development do
  Slim::Engine.set_default_options :pretty => true
end

configure do
  @@contents = {}
  @@max_html_byte = 500 * 1024
end

helpers do
  def location(id)
    port = request.port == 80 ? '' : ':' + request.port.to_s
    request.scheme + '://' + request.host + port + '/contents/' + id
  end
end

get '/' do
  slim :index
end

get '/dummy' do
  slim :dummy
end

post '/contents' do
  contents = params[:contents] || ''

  if contents.bytesize <= 0
    halt 400
  end

  t   = Time.new
  str = contents + t.to_i.to_s + t.usec.to_s
  id  = Digest::SHA1.hexdigest(str)

  @@contents[id] = contents

  test_url = "http://www.google.co.jp/webmasters/tools/richsnippets?&view=&url="
  test_url += CGI.escape(location(id))

  headers 'Content-type' => 'application/json; charset=utf-8'
  {:location => location(id), :test_url => test_url}.to_json
end

get '/contents/:id' do |id|
  halt 404 unless @@contents[id]

  html = @@contents[id]
  @@contents.delete(id)
  html
end

get '/css/richsnippets.css' do
  sass :richsnippets
end
