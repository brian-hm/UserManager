package com.brian.userManager.exceptions;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdvisor {
	@ExceptionHandler(DataIntegrityException.class)
	public ResponseEntity<Error> dataIntegrity(DataIntegrityException e, HttpServletRequest request){
		Error erro = new Error(HttpStatus.BAD_REQUEST.value(), e.getMessage(), System.currentTimeMillis());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
		
	}
	
	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<Error> objectNotFound (ObjectNotFoundException e, HttpServletRequest request){
		Error erro = new Error(HttpStatus.BAD_REQUEST.value(), e.getMessage(), System.currentTimeMillis());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
		
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Error> validation (MethodArgumentNotValidException e, HttpServletRequest request){
		ValidationError error = new ValidationError(HttpStatus.BAD_REQUEST.value(), "Erro de validação!", System.currentTimeMillis());
		for(FieldError x : e.getBindingResult().getFieldErrors()) {
			error.addError(x.getField(), x.getDefaultMessage());
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}
	
	
}
