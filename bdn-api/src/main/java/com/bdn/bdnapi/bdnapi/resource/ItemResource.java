package com.bdn.bdnapi.bdnapi.resource;

import com.bdn.bdnapi.bdnapi.model.Item;
import com.bdn.bdnapi.bdnapi.model.ItemResumido;
import com.bdn.bdnapi.bdnapi.model.Lista;
import com.bdn.bdnapi.bdnapi.repository.ItemRepository;
import com.bdn.bdnapi.bdnapi.repository.ItemResumidoRepository;
import com.bdn.bdnapi.bdnapi.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemResource {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemResumidoRepository itemResumidoRepository;

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> buscarItens(){
        return itemRepository.findAll();
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<Item> atualizarItem(@PathVariable Long codigo, @RequestBody Item item){
        Item itemSalvo = itemService.atualizar(codigo, item);
        return ResponseEntity.status(HttpStatus.OK).body(itemSalvo);
    }

    @PostMapping
    public ResponseEntity<Item> criarItem(@RequestBody Item item){
        Item itemSalvo = itemRepository.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemSalvo);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarItem(@PathVariable Long codigo){ itemRepository.deleteById(codigo); }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{codigo}/finalizar")
    public void finalizarItem(@PathVariable Long codigo){
        itemService.finalizar(codigo);
    }

    //Itens concluidos
    @GetMapping("/concluidos")
    public List<ItemResumido> buscarItensResumidos(){
        return itemResumidoRepository.findAll();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/concluidos/{codigo}")
    public void deletarResumido(@PathVariable Long codigo){ itemResumidoRepository.deleteById(codigo); }
}
