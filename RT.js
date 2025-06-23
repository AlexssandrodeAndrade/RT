async function gerarPDF() {
  try {
    const pdfDoc = await carregarPDFdoInput(); // ← lê do input file
    await preencherPDF(pdfDoc); // ← preenche os campos
    const pdfBytes = await pdfDoc.save(); // ← salva o PDF

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  } catch (e) {
    console.error("Erro ao gerar PDF:", e);
    alert("Erro ao gerar PDF: " + e.message);
  }
}

async function carregarPDFdoInput() {
  const fileInput = document.getElementById("pdfFile");
  if (!fileInput.files.length) {
    throw new Error("Nenhum arquivo PDF foi selecionado.");
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();
  return await PDFLib.PDFDocument.load(arrayBuffer);
}

async function preencherPDF(pdfDoc) {
  const { rgb, StandardFonts } = PDFLib;
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const corFonte = rgb(1, 0, 0); // vermelho de teste
  const fontSize = 10;

  const get = (id) => document.getElementById(id)?.value || "";

  const firstPage = pdfDoc.getPages()[0];

  // Obter valores fieldset 1 fset1_
  if (1 === 1) {
    const fset1_razao_social = get("fset1_razao_social");
    const fset1_cnpj = get("fset1_cnpj");
    const fset1_nome_fantasia = get("fset1_nome_fantasia");
    const fset1_endereco = get("fset1_endereco");
    const fset1_cep = get("fset1_cep");
    const fset1_cidade = get("fset1_cidade");
    const fset1_telelefo = get("fset1_telefone");
    const fset1_ramo = get("fset1_ramo");
    const fset1_bairro = get("fset1_bairro");
    const fset1_email = get("fset1_email");

    // Natureza
    let fset1_posX = 0;
    let fset1_posY = 0;
    const fset1_natureza = document.querySelector(
      'input[name="fset1_natureza"]:checked'
    )?.value;

    switch (fset1_natureza) {
      case "Pública":
        fset1_posX = 400;
        fset1_posY = 626;
        break;
      case "Privada":
        fset1_posX = 483;
        fset1_posY = 626;
        break;
      case "Filantrópica":
        fset1_posX = 563;
        fset1_posY = 626;
        break;
    }

    // ⚠️ Posições estimadas (x, y em pontos PDF - ajustável) fieldset 1 fset1_
    firstPage.drawText(fset1_razao_social, {
      x: 70,
      y: 680,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_cnpj, {
      x: 404,
      y: 680,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_nome_fantasia, {
      x: 80,
      y: 668,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_endereco, {
      x: 60,
      y: 655,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_bairro, {
      x: 345,
      y: 655,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_cep, {
      x: 485,
      y: 655,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_cidade, {
      x: 50,
      y: 642,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_telelefo, {
      x: 240,
      y: 642,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_email, {
      x: 355,
      y: 642,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset1_ramo, {
      x: 90,
      y: 630,
      size: fontSize,
      font,
      color: corFonte,
    });
    if (fset1_posX && fset1_posY) {
      firstPage.drawText("X", {
        x: fset1_posX,
        y: fset1_posY,
        size: fontSize,
        font,
        color: corFonte,
      });
    }
  }

  // Obter valores fieldset 2 fset2_
  if (1 === 1) {
    const fset2_razao_social = get("fset2_razao_social");
    const fset2_cnpj = get("fset2_cnpj");
    const fset2_nome_fantasia = get("fset2_nome_fantasia");
    const fset2_dptoUnidServicos = get("fset2_dptoUnidServicos");
    const fset2_endereco = get("fset2_endereco");
    const fset2_bairro = get("fset2_bairro");
    const fset2_cep = get("fset2_cep");
    const fset2_cidade = get("fset2_cidade");
    const fset2_telelefo = get("fset2_telefone");
    const fset2_email1 = get("fset2_email1");
    const fset2_horario_funcionamento = get("fset2_horario_funcionamento");
    const fset2_email2 = get("fset2_email2");
    const fset2_ramo_atividade = get("fset2_ramo_atividade");

    // Natureza
    let fset2_posX = 0;
    let fset2_posY = 0;
    const fset2_natureza = document.querySelector(
      'input[name="fset2_natureza"]:checked'
    )?.value;

    switch (fset2_natureza) {
      case "Pública":
        fset2_posX = 413;
        fset2_posY = 526;
        break;
      case "Privada":
        fset2_posX = 482;
        fset2_posY = 525;
        break;
      case "Filantrópica":
        fset2_posX = 563;
        fset2_posY = 524;
        break;
    }

    // Lista dos checkboxes marcados
    const tiposRTSelecionados = Array.from(
      document.querySelectorAll('input[name="fset2_rt_tipo"]:checked')
    ).map((el) => el.value);

    // Loop pelos tipos marcados
    tiposRTSelecionados.forEach((tipo) => {
      let x = 0;
      let y = 0;

      switch (tipo) {
        // case "marcar_com_um_x":
        //   x = 78;
        //   y = 480;
        //   break;
        case "rt_pgrss":
          x = 183;
          y = 480;
          break;
        case "rt_auditoria":
          x = 289;
          y = 480;
          break;
        case "rt_ensino":
          x = 78;
          y = 460;
          break;
        case "rt_assistencial":
          x = 183;
          y = 460;
          break;
        case "rt_equipamentos":
          x = 289;
          y = 460;
          break;
      }

      if (x && y) {
        firstPage.drawText("X", {
          x,
          y,
          size: fontSize,
          font,
          color: corFonte,
        });
      }
    });

    // ⚠️ Posições estimadas (x, y em pontos PDF - ajustável) fieldset 1 fset1_
    firstPage.drawText(fset2_razao_social, {
      x: 70,
      y: 590,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_cnpj, {
      x: 410,
      y: 590,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_nome_fantasia, {
      x: 80,
      y: 578,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_dptoUnidServicos, {
      x: 390,
      y: 578,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_endereco, {
      x: 70,
      y: 565,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_bairro, {
      x: 355,
      y: 565,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_cep, {
      x: 490,
      y: 565,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_cidade, {
      x: 60,
      y: 553,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_telelefo, {
      x: 230,
      y: 553,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_email1, {
      x: 370,
      y: 553,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_horario_funcionamento, {
      x: 130,
      y: 540,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_email2, {
      x: 375,
      y: 540,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset2_ramo_atividade, {
      x: 90,
      y: 528,
      size: fontSize,
      font,
      color: corFonte,
    });
    if (fset2_posX && fset2_posY) {
      firstPage.drawText("X", {
        x: fset2_posX,
        y: fset2_posY,
        size: fontSize,
        font,
        color: corFonte,
      });
    }
  }

  // --- Fieldset 3: Responsável Técnico ---
  if (1 === 1) {
    const fset3_nome = get("fset3_nome");
    const fset3_coren = get("fset3_coren");
    const fset3_dias = get("fset3_dias");
    const fset3_horario = get("fset3_horario");
    const fset3_carga = get("fset3_carga");
    const fset3_endereco = get("fset3_endereco");
    const fset3_bairro = get("fset3_bairro");
    const fset3_cidade = get("fset3_cidade");
    const fset3_cep = get("fset3_cep");
    const fset3_telefone = get("fset3_telefone");
    const fset3_email = get("fset3_email");

    // Ajuste as coordenadas conforme posição no seu PDF:
    firstPage.drawText(fset3_nome, {
      x: 130,
      y: 495,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_coren, {
      x: 450,
      y: 495,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_dias, {
      x: 170,
      y: 481,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_horario, {
      x: 140,
      y: 467,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_carga, {
      x: 470,
      y: 467,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_endereco, {
      x: 160,
      y: 453,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_bairro, {
      x: 470,
      y: 453,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_cidade, {
      x: 100,
      y: 439,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_cep, {
      x: 270,
      y: 439,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_telefone, {
      x: 350,
      y: 439,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset3_email, {
      x: 460,
      y: 439,
      size: fontSize,
      font,
      color: corFonte,
    });
  }

  // --- Fieldset 4: Outros vínculos profissionais ---
  if (1 === 1) {
    const fset4_vinculo = document.querySelector(
      'input[name="fset4_vinculo"]:checked'
    )?.value;

    if (fset4_vinculo === "sim") {
      const fset4_nome_inst = get("fset4_nome_inst");
      const fset4_funcao = get("fset4_funcao");
      const fset4_endereco = get("fset4_endereco");
      const fset4_bairro = get("fset4_bairro");
      const fset4_cep = get("fset4_cep");
      const fset4_cidade = get("fset4_cidade");
      const fset4_tel = get("fset4_tel");
      const fset4_email = get("fset4_email");
      const fset4_dias = get("fset4_dias");
      const fset4_horario = get("fset4_horario");
      const fset4_carga = get("fset4_carga");

      // Posicione conforme sua folha (estimado com base na imagem):
      firstPage.drawText(fset4_nome_inst, {
        x: 130,
        y: 412,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_funcao, {
        x: 455,
        y: 412,
        size: fontSize,
        font,
        color: corFonte,
      });

      firstPage.drawText(fset4_endereco, {
        x: 85,
        y: 398,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_bairro, {
        x: 395,
        y: 398,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_cep, {
        x: 505,
        y: 398,
        size: fontSize,
        font,
        color: corFonte,
      });

      firstPage.drawText(fset4_cidade, {
        x: 55,
        y: 384,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_tel, {
        x: 240,
        y: 384,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_email, {
        x: 390,
        y: 384,
        size: fontSize,
        font,
        color: corFonte,
      });

      firstPage.drawText(fset4_dias, {
        x: 185,
        y: 370,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_horario, {
        x: 130,
        y: 356,
        size: fontSize,
        font,
        color: corFonte,
      });
      firstPage.drawText(fset4_carga, {
        x: 470,
        y: 356,
        size: fontSize,
        font,
        color: corFonte,
      });
    }

    // Marcar X na opção Sim/Não
    if (fset4_vinculo === "sim") {
      firstPage.drawText("X", {
        x: 88,
        y: 311,
        size: fontSize,
        font,
        color: corFonte,
      }); // posição estimada para "Sim"
    } else {
      firstPage.drawText("X", {
        x: 30,
        y: 311,
        size: fontSize,
        font,
        color: corFonte,
      }); // posição estimada para "Não"
    }
  }

  if (1 === 1) {
    // --- Fieldset 5: Representante legal da Empresa/Instituição ---
    const fset5_representante = get("fset5_representante");
    const fset5_cargo = get("fset5_cargo");
    const fset5_cidade_data = get("fset5_cidade_data");
    const fset5_dia = get("fset5_dia");
    const fset5_mes = get("fset5_mes");
    const fset5_ano = get("fset5_ano");

    // Desenhar os campos (coordenadas estimadas com base na imagem)
    firstPage.drawText(fset5_representante, {
      x: 170,
      y: 320,
      size: fontSize,
      font,
      color: corFonte,
    });

    firstPage.drawText(fset5_cargo, {
      x: 480,
      y: 320,
      size: fontSize,
      font,
      color: corFonte,
    });

    // Data: Cidade, dia, mês, ano
    firstPage.drawText(fset5_cidade_data, {
      x: 190,
      y: 292,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset5_dia, {
      x: 310,
      y: 292,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset5_mes, {
      x: 375,
      y: 292,
      size: fontSize,
      font,
      color: corFonte,
    });
    firstPage.drawText(fset5_ano, {
      x: 475,
      y: 292,
      size: fontSize,
      font,
      color: corFonte,
    });
  }

  return pdfDoc;
}
