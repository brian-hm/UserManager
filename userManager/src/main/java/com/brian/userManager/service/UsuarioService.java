package com.brian.userManager.service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.brian.userManager.exceptions.DataIntegrityException;
import com.brian.userManager.exceptions.ObjectNotFoundException;
import com.brian.userManager.model.Perfil;
import com.brian.userManager.model.Pessoa;
import com.brian.userManager.model.Usuario;
import com.brian.userManager.repository.PessoaRepository;
import com.brian.userManager.repository.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	private PessoaRepository repository;
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Transactional
	public Usuario criar(Usuario obj) {
		try {			
			Calendar dataCriacao = Calendar.getInstance();
			obj.setDataCadastro(dataCriacao.getTime());
			if(obj.getCargo() != null && obj.getCargo().getId() == null) {				
				throw new ObjectNotFoundException("Cargo obrigatório!");
			}			
			Usuario user = repository.save(obj);
			return user;
			
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Usuário já cadastrado!");
		}
		
		
	}
	
	public Usuario findById(Integer id) {
		Optional<Usuario> obj = usuarioRepository.findById(id);
		return obj.orElseThrow(()-> new ObjectNotFoundException("Objeto não encontrado! ID: " + id + ", tipo: " + Perfil.class.getName()));
		
	}
	
	public List<Pessoa> findAll(){
		List<Pessoa> list = repository.findAll();
		return list;
	}
	
	public void updateData(Usuario newObj, Usuario obj) {
		newObj.setNome(obj.getNome());
		newObj.setCargo(obj.getCargo());
		newObj.setCpf(obj.getCpf());
		newObj.setDataNascimento(obj.getDataNascimento());
		newObj.setSexo(obj.getSexo());
		newObj.setPerfis(obj.getPerfis());
	}
	
	public Usuario editar(Usuario obj) {
		Usuario pessoa = findById(obj.getId());
		updateData(pessoa, obj);
		try {
			return repository.save(pessoa);
		}catch(DataIntegrityViolationException e) {
			throw new DataIntegrityException("Usuario já cadastrado!");
		}
	}
}
