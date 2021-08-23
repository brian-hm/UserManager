package com.brian.userManager.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.brian.userManager.model.Pessoa;
import com.brian.userManager.model.Usuario;
import com.brian.userManager.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	@Autowired
	private UsuarioService service;
	
	@RequestMapping(method=RequestMethod.POST)
	public ResponseEntity<Usuario> criar(@Valid @RequestBody Usuario obj){
		Usuario usuario = service.criar(obj);
		return ResponseEntity.ok().body(usuario);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.GET)
	public ResponseEntity<Pessoa> findById(@PathVariable Integer id){
		Pessoa pessoa = service.findById(id);
		return ResponseEntity.ok().body(pessoa);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Pessoa>> findAll(){
		List<Pessoa> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(value = "/{id}",method=RequestMethod.PUT)
	public ResponseEntity<Usuario> editar(@Valid @RequestBody Usuario obj,@PathVariable Integer id){
		obj.setId(id);
		Usuario usuario = service.editar(obj);
		return ResponseEntity.ok().body(usuario);
	}
}
