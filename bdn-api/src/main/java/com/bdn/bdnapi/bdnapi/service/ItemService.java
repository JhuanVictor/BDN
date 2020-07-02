package com.bdn.bdnapi.bdnapi.service;

import com.bdn.bdnapi.bdnapi.model.Item;
import com.bdn.bdnapi.bdnapi.model.ItemResumido;
import com.bdn.bdnapi.bdnapi.model.Lista;
import com.bdn.bdnapi.bdnapi.repository.ItemRepository;
import com.bdn.bdnapi.bdnapi.repository.ItemResumidoRepository;
import com.bdn.bdnapi.bdnapi.repository.ListaRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ListaRepository listaRepository;

    @Autowired
    private ItemResumidoRepository itemResumidoRepository;

    public Item atualizar(Long codigo, Item item){
        Item itemSalvo = buscarPeloCodigo(codigo);
        BeanUtils.copyProperties(item, itemSalvo, "codigo");
        return itemRepository.save(itemSalvo);
    }

    public Item buscarPeloCodigo(Long codigo){
        Item itemSalvo = itemRepository.findById(codigo)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Item %d", codigo)));
        if (itemSalvo == null) {
            throw new EmptyResultDataAccessException(1);
        }
        return itemSalvo;
    }

    public void finalizar(Long codigo){
        Item itemSelecionado = buscarPeloCodigo(codigo); //Item que será retirado da lista

        //Atribuindo valores do item antigo ao novo item resumido;
        ItemResumido itemResumido = new ItemResumido();
        itemResumido.setNome(itemSelecionado.getNome());
        itemResumido.setListaNome(itemSelecionado.getLista().getNome());

        itemResumidoRepository.save(itemResumido);
        itemRepository.deleteById(codigo);
    }
}
